export type Type = "EVENT" | "REQUEST" | "RESPONSE" | "SUBSCRIPTION" | "UNSUBSCRIPTION";

export interface Message {
    type: Type;
    body: any;
    v: number;
    rid: number;
}