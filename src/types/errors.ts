'use strict';

export class BadRequest extends Error {
    constructor(private type: string, private data?: any[]) {
        super(`BadRequest: ${type}: ${data}`)
    }
}