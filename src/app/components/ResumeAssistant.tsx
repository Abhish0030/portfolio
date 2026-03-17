import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, CornerDownLeft, Sparkles } from 'lucide-react';
import { buildLocalResumeAnswer, initialMessage, quickPrompts } from '../../shared/resumeAssistantContext';

const resumeAssistantEndpoint =
  import.meta.env.VITE_RESUME_ASSISTANT_URL?.trim() || '/api/resume-assistant';

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface ResumeStreamEvent {
  type?: string;
  delta?: string;
  source?: 'openai' | 'local';
}

async function consumeAssistantStream(
  question: string,
  onEvent: (event: ResumeStreamEvent) => void,
  signal: AbortSignal
) {
  const response = await fetch(resumeAssistantEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`stream_request_failed_${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split('\n\n');
    buffer = frames.pop() || '';

    for (const frame of frames) {
      const dataLines = frame
        .split('\n')
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trim());

      if (!dataLines.length) continue;

      const rawData = dataLines.join('\n');
      if (rawData === '[DONE]') continue;

      const parsed = JSON.parse(rawData) as ResumeStreamEvent;
      onEvent(parsed);
    }
  }
}

async function consumeLocalFallbackStream(
  question: string,
  onEvent: (event: ResumeStreamEvent) => void,
  signal: AbortSignal
) {
  const answer = buildLocalResumeAnswer(question);
  const chunks = answer.match(/.{1,24}(\s|$)|\S+/g) || [answer];

  onEvent({ type: 'response.created', source: 'local' });

  for (const chunk of chunks) {
    if (signal.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    onEvent({
      type: 'response.output_text.delta',
      delta: chunk,
      source: 'local',
    });

    await new Promise((resolve) => window.setTimeout(resolve, 28));
  }

  onEvent({ type: 'response.completed', source: 'local' });
}

export function ResumeAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'assistant-intro', role: 'assistant', content: initialMessage },
  ]);
  const [draft, setDraft] = useState(quickPrompts[0]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastSource, setLastSource] = useState<'openai' | 'local'>('local');
  const viewportRef = useRef<HTMLDivElement>(null);
  const streamAbortRef = useRef<AbortController | null>(null);

  const statusLabel = useMemo(
    () =>
      isStreaming
        ? lastSource === 'openai'
          ? 'Streaming from OpenAI'
          : 'Streaming from local resume context'
        : lastSource === 'openai'
          ? 'OpenAI connected'
          : 'Local resume context ready',
    [isStreaming, lastSource]
  );

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const submitQuestion = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const assistantId = `assistant-${Date.now() + 1}`;

    setMessages((prev) => [...prev, userMessage, { id: assistantId, role: 'assistant', content: '' }]);
    setDraft('');
    setIsStreaming(true);
    setLastSource('local');

    streamAbortRef.current?.abort();
    const abortController = new AbortController();
    streamAbortRef.current = abortController;

    try {
      await consumeAssistantStream(
        trimmed,
        (event) => {
          if (event.source) {
            setLastSource(event.source);
          }

          if (event.type === 'response.output_text.delta' && event.delta) {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantId
                  ? { ...message, content: `${message.content}${event.delta}` }
                  : message
              )
            );
          }
        },
        abortController.signal
      );
    } catch {
      await consumeLocalFallbackStream(
        trimmed,
        (event) => {
          if (event.source) {
            setLastSource(event.source);
          }

          if (event.type === 'response.output_text.delta' && event.delta) {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantId
                  ? { ...message, content: `${message.content}${event.delta}` }
                  : message
              )
            );
          }
        },
        abortController.signal
      );
    } finally {
      if (streamAbortRef.current === abortController) {
        streamAbortRef.current = null;
      }
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
      setIsStreaming(false);
    };
  }, []);

  return (
    <div className="relative h-full overflow-hidden rounded-[26px] md:rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,18,28,0.96),rgba(9,11,18,0.98))] p-4 md:p-5 text-[#efe7d7] shadow-[0_30px_80px_rgba(0,0,0,0.36)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="mb-5">
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#b3a89a]">Resume Assistant</p>
          <h3 className="mb-3 text-2xl md:text-4xl leading-none text-[#f3ecdf]">Chat with my resume</h3>
          <p className="max-w-md text-sm md:text-lg leading-6 md:leading-8 text-[#b7afa4]">
            A focused AI-style assistant that answers from portfolio and resume context directly inside the page.
          </p>
        </div>

        <div className="mb-4 rounded-[22px] md:rounded-[26px] border border-white/10 bg-white/[0.04] p-4 md:p-5">
          <div className="mb-2 flex items-center gap-3 text-[#d7cebf]">
            <Bot className="h-4 w-4 text-[#ff934d]" />
            <span className="text-lg md:text-xl leading-none">Resume AI</span>
          </div>
          <p className="text-sm md:text-lg leading-6 md:leading-8 text-[#b7afa4]">{statusLabel}</p>
        </div>

        <div
          ref={viewportRef}
          className="mb-4 flex-1 space-y-3 overflow-y-auto rounded-[22px] md:rounded-[26px] border border-white/10 bg-[#0a0d14]/90 p-3 md:p-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[96%] md:max-w-[92%] rounded-[20px] md:rounded-[22px] px-3 md:px-4 py-3 text-sm md:text-[15px] leading-6 md:leading-7 ${
                message.role === 'assistant'
                  ? 'border border-white/10 bg-white/[0.05] text-[#efe7d7]'
                  : 'ml-auto border border-[#ff934d]/20 bg-[#ff934d] text-[#241405]'
              }`}
            >
              {message.content || <span className="inline-flex gap-1 text-[#b7afa4]"><span>.</span><span>.</span><span>.</span></span>}
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setDraft(prompt)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.16em] text-[#c9bfaf] transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#ff934d]" />
                {prompt.length > 30 ? `${prompt.slice(0, 30)}...` : prompt}
              </span>
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submitQuestion(draft);
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="sr-only">Ask a question about the resume</span>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={4}
              placeholder="Ask about experience, projects, AI/ML learning, or tech stack."
              className="min-h-[120px] md:min-h-[150px] w-full resize-none rounded-[22px] md:rounded-[26px] border border-white/10 bg-[#090c13] px-4 md:px-5 py-4 text-base md:text-2xl leading-6 md:leading-10 text-[#efe7d7] placeholder:text-[#756d62] focus:border-[#ff934d]/50 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={isStreaming}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ff934d] px-6 py-3 md:py-4 text-lg md:text-2xl text-[#1d1208] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <CornerDownLeft className="h-5 w-5" />
            {isStreaming ? 'Answering...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
