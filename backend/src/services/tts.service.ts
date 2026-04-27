/**
 * @description Google Cloud Text-to-Speech service
 * @googleService Google Cloud Text-to-Speech API
 * @purpose Accessibility — audio output for low-literacy users
 */
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

const client = new TextToSpeechClient({
  projectId: process.env.PROJECT_ID
})

/**
 * @description Converts election explanation text to audio
 * @param text - Text to synthesize (election explanation)
 * @param languageCode - BCP-47 language code (e.g., 'hi-IN', 'en-IN')
 * @returns Base64 encoded MP3 audio content
 * @googleService Google Cloud Text-to-Speech
 * @freeTier 1 million characters per month (Standard voices)
 */
export async function synthesizeSpeech(
  text: string,
  languageCode = 'en-IN'
): Promise<string | null> {
  try {
    const [response] = await client.synthesizeSpeech({
      input: { text: text.slice(0, 5000) }, // TTS limit
      voice: {
        languageCode,
        ssmlGender: 'NEUTRAL',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.9, // Slightly slower for clarity
      },
    })
    
    if (response.audioContent) {
      return Buffer.from(response.audioContent).toString('base64')
    }
    return null
  } catch {
    return null // TTS failure is non-critical
  }
}
