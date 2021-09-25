export default class RunnerOutput {
    private _code: number;

    get code(): number {
        return this._code;
    }

    get isError(): boolean {
        return this._code != 0;
    }

    private _message: string;

    get message(): string {
        return this._message;
    }

    private _rawMessage: Uint8Array;

    get rawMessage(): Uint8Array {
        return this._rawMessage;
    }

    constructor (code: number, message: Uint8Array|string) {
        this._code = code;
        if (message instanceof Uint8Array) {
            this._rawMessage = message;
            this._message = new TextDecoder().decode(message);
        } else {
            this._rawMessage = new TextEncoder().encode(message);
            this._message = message;
        }
    }
}