export class MissingRequiredEnhancer extends Error {
    public constructor(enhancerName: string, requiredEnhancerName: string) {
        super(`Missing required enhancer [ ${requiredEnhancerName} ] when loading ` +
            `enhancer: [ ${enhancerName} ].`)
    }
}