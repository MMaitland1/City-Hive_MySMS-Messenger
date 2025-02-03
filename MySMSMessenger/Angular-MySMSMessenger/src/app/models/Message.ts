export interface Message {
  // The phone number associated with the message (could be sender's or recipient's phone number)
  phoneNumber: string;

  // The timestamp when the message was sent, typically in ISO 8601 format
  timestamp: string;

  // The content or text of the message
  content: string;

  // The number of characters in the message content
  charCount: number;

  // The unique identifier of the user (likely hashed) who sent or is associated with the message
  usernameHash: string;
}
