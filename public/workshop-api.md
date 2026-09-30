# Workshop API connection

Use the baseUrl and temporary token copied from the workshop guide. This is a limited workshop connection, not an OpenAI API key. It expires after six hours. Save it in your exercise application's private server settings as WORKSHOP_API_BASE_URL and WORKSHOP_API_TOKEN; do not publish it in your application's source.

Make HTTPS JSON requests with `Authorization: Bearer <workshop token>` and `Content-Type: application/json`. All paths below are relative to baseUrl. The facilitator's key remains in the workshop server's secrets. This gateway uses a small, fixed API contract, not the full OpenAI SDK interface.

## Text and filtered summaries

POST `/responses` with `{ "input": "Question or selected fictional records", "instructions": "What to produce, including the expected JSON shape if needed" }`.

Uses the OpenAI Responses API with gpt-5-mini, store:false, minimal reasoning and at most 2,000 output tokens. input: up to 24,000 characters; instructions: up to 4,000. The reply includes output_text, output, status and usage. Verify status is completed, parse and validate JSON when requested, validate every cited source ID, and calculate counts in application code. If the selected data is too large, ask for narrower filters or clearly disclose any sample. No tools, streaming, arbitrary models or previous-response IDs are accepted. Include the necessary conversation history in input.

## Generate or edit an image

POST `/images` with `{ "prompt": "Help card to generate" }`. For an edit, also send `"image": "data:image/png;base64,..."` (PNG/JPEG/WebP, decoded file at most 1 MB). Resize a generated reference locally before editing if necessary. prompt: at most 4,000 characters.

Uses the Image API with gpt-image-1-mini, low quality, one 1024×1024 image. Render/download `data[0].b64_json` as a PNG. Keep readable companion text and check factual content. One generation and one edit consume the connection's two image requests.

## GPT-Live voice

POST `/live/sessions` with `{ "sdp": "Browser WebRTC SDP offer", "instructions": "Concise workshop role and relevant knowledge" }`. SDP: up to 32,000 characters; instructions: up to 8,000.

The gateway creates a gpt-live-1 WebRTC session with store:false and **client delegation**. Apply `result.transport.sdp` as the peer's remote answer and preserve `result.session.id`. Wait for session.started; do not send session.start. No OpenAI credential is returned. Use current official GPT-Live client-delegation docs to handle delegated work in the exercise application. Send necessary knowledge/routing requests through `/responses` and pass their results back over the data channel; do not try to switch to Responses delegation or enable provider tools. Seed a short factual knowledge excerpt in the session instructions for the first conversation.

Only start voice from a participant action with microphone permission. Include start/mute/end controls, an AI voice label, a visible timer, and a two-minute exercise stop timer. End with session.close, wait for session.closed, then stop every microphone track and close the peer connection. The exercise stop timer is client-side; the gateway limits session creation, not voice minutes. Reconnection consumes a new session request. API model access and microphone testing must be checked; report blockers honestly.

References: https://developers.openai.com/api/docs/guides/voice-webrtc?api=live and https://developers.openai.com/api/docs/guides/live-delegation

## Allowances and errors

Each connection permits 30 text requests, 2 image requests and 1 voice session. Shared caps for the whole workshop are 1,000 text requests, 40 images, 10 voice sessions and 200 connections. These are cumulative, not daily refreshes. A fresh connection does not reset shared caps. Failed upstream requests also use allowance. Generating a connection itself makes no paid API call.

Use GET `/status` to check configuration without a paid request. It does not verify provider billing or model access. Handle 401 by copying a fresh connection; 413 by reducing input; 429 by showing a limit message and avoiding automatic retries; 502/503 by showing an unavailable state and preserving the user's work. Empty selections must not call the API. Debounce filters, cancel/discard stale responses, cache summaries by scope and data version, and show loading/error states. The ordinary charts must work without API access.
