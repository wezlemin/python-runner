export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const prompt = body.prompt || "Hello";

  const result = await env.AI.run(
    "@cf/meta/llama-3.1-8b-instruct",
    {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    }
  );

  return new Response(
    JSON.stringify({ answer: result.response }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
