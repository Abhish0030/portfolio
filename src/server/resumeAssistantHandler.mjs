const resumeContext = {
  strengths: [
    'clean frontend structure with React and TypeScript',
    'practical backend thinking with Node.js, Django, FastAPI, and databases',
    'AI/ML curiosity applied to weather, agriculture, and decision-support ideas',
  ],
  currentFocus:
    'Abhishek is a second-year B.Tech CSE student at SRM University AP, currently growing in AI/ML while continuing to build modern web projects.',
  projects: [
    'AI-Powered Weather Forecasting Platform for small-sector farmers with one-month predictions.',
    'Agricultural Advisory System for soil fertility, moisture, humus, and crop recommendations.',
    'Ilmify, a focused learning platform for aspirants.',
    'Student Management System and an advanced productivity-oriented todo app.',
  ],
  stack:
    'Core tools include C, C++, Python, HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind, Node.js, Django, FastAPI, MySQL, PostgreSQL, MongoDB, Docker, and AWS basics.',
  teamwork:
    'He is best suited for teams that value learning speed, practical execution, clean interfaces, and solving user-facing problems with modern web and AI tooling.',
};

function buildLocalResumeAnswer(question) {
  const normalized = question.toLowerCase();

  if (normalized.includes('full-stack') || normalized.includes('frontend') || normalized.includes('backend')) {
    return `I do my best work on full-stack builds where the frontend needs to feel clean and responsive, while the backend stays practical and easy to extend. My strongest mix right now is React and TypeScript on the interface side, paired with backend learning across Node.js, Django, FastAPI, and databases.`;
  }

  if (normalized.includes('project') || normalized.includes('ai') || normalized.includes('machine learning')) {
    return `The strongest examples are the AI-powered weather forecasting platform and the agricultural advisory system. Both are grounded in real-world decision support, which shows a pattern in my work: I like building software that turns technical ideas into something useful for people.`;
  }

  if (normalized.includes('tech') || normalized.includes('stack') || normalized.includes('tools')) {
    return `My current stack spans ${resumeContext.stack} I am especially focused on getting sharper with React, TypeScript, Python, backend architecture, and AI/ML workflows.`;
  }

  if (normalized.includes('team') || normalized.includes('culture') || normalized.includes('work with')) {
    return resumeContext.teamwork;
  }

  if (normalized.includes('study') || normalized.includes('learning') || normalized.includes('focus') || normalized.includes('now')) {
    return `${resumeContext.currentFocus} Right now I am trying to connect solid engineering habits with AI/ML learning instead of treating them as separate tracks.`;
  }

  if (normalized.includes('experience') || normalized.includes('resume') || normalized.includes('about')) {
    return `I am building a profile around ${resumeContext.strengths.join(', ')}. My resume is still early-career, but the pattern is clear: I learn quickly, ship practical projects, and prefer work that blends product thinking with implementation.`;
  }

  return `From my resume context, the main story is this: ${resumeContext.currentFocus} My work so far centers on ${resumeContext.projects[0]} and ${resumeContext.projects[1]} while continuing to expand into stronger full-stack execution.`;
}

function createResumeSystemPrompt() {
  return [
    'You are the portfolio resume assistant for Abhishek Singh.',
    'Answer in first person as Abhishek when appropriate.',
    'Keep answers concise, direct, and useful for a recruiter, collaborator, or hiring manager.',
    'Do not invent achievements, companies, or years that are not present in the provided context.',
    'If a question asks for something not in context, say that directly and answer conservatively.',
    '',
    `Current focus: ${resumeContext.currentFocus}`,
    `Strengths: ${resumeContext.strengths.join('; ')}`,
    `Projects: ${resumeContext.projects.join(' ')}`,
    `Tech stack: ${resumeContext.stack}`,
    `Team fit: ${resumeContext.teamwork}`,
  ].join('\n');
}

function createSseResponse(start) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const send = (event, data) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      const close = () => controller.close();
      const fail = (error) => controller.error(error);

      start({ send, close, fail });
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
    },
  });
}

function streamLocalAnswer(question, reason = 'local_fallback') {
  const answer = buildLocalResumeAnswer(question);

  return createSseResponse(({ send, close }) => {
    send('response.created', { type: 'response.created', source: 'local', reason });

    for (const chunk of answer.match(/.{1,24}(\s|$)|\S+/g) || [answer]) {
      send('response.output_text.delta', {
        type: 'response.output_text.delta',
        delta: chunk,
        source: 'local',
      });
    }

    send('response.completed', { type: 'response.completed', source: 'local' });
    close();
  });
}

export async function handleResumeAssistantRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return new Response('Invalid JSON payload.', { status: 400 });
  }

  const question = payload.question?.trim();
  if (!question) {
    return new Response('A question is required.', { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return streamLocalAnswer(question, 'missing_openai_api_key');
  }

  try {
    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5',
        input: [
          {
            role: 'system',
            content: [{ type: 'input_text', text: createResumeSystemPrompt() }],
          },
          {
            role: 'user',
            content: [{ type: 'input_text', text: question }],
          },
        ],
        stream: true,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return streamLocalAnswer(question, `openai_error_${apiResponse.status}:${errorText.slice(0, 120)}`);
    }

    return new Response(apiResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-store',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return streamLocalAnswer(
      question,
      error instanceof Error ? error.message : 'unknown_openai_error'
    );
  }
}
