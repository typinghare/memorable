export class EnhancerNotFound extends Error {
    public constructor(private readonly enhancerName: string) {
        super(`Enhancer not found: [ ${enhancerName} ].`)
    }

    public getEnhancerName(): string {
        return this.enhancerName
    }
}