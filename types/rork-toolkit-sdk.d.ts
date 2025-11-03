/**
 * Type declarations for @rork/toolkit-sdk
 * This SDK is injected by the Rork platform at runtime
 */

declare module "@rork/toolkit-sdk" {
  export interface TextContent {
    type: "text";
    text: string;
  }

  export interface ImageContent {
    type: "image";
    image: string;
  }

  export type MessageContent = TextContent | ImageContent;

  export interface Message {
    role: "user" | "assistant" | "system";
    content: MessageContent[] | string;
  }

  export interface GenerateTextOptions {
    messages: Message[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }

  /**
   * Generate text using Rork's AI service
   * @param options - Configuration for text generation
   * @returns Generated text response
   */
  export function generateText(options: GenerateTextOptions): Promise<string>;
}
