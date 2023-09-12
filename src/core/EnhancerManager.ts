import { Enhancer } from './Enhancer'

/**
 * Enhancer manager.
 */
export class EnhancerManager {
    /**
     * Enhancer list.
     * @private
     */
    private readonly enhancerList: Enhancer[] = []

    /**
     * Returns enhancer list.
     */
    public getEnhancerList(): Enhancer[] {
        return this.enhancerList
    }

    /**
     * Registers an enhancer
     * @param enhancer The enhancer to register
     */
    public registerEnhancer(enhancer: Enhancer): Enhancer {
        this.enhancerList.push(enhancer)

        return enhancer
    }
}