/**
 * A drawing.
 */
export type Drawing<B, P, R> = (blank: B, material: any, origin: R) => P

/**
 * A lathe that processes blanks with drawings.
 */
export class Lathe<B, S, P> {
    /**
     * A blank drawing.
     * @param blank The blank provided
     * @constructor
     */
    public static readonly BLANK_DRAWING = (blank: any) => blank

    /**
     * Semi drawing list.
     * @private
     */
    private readonly semiDrawingList: Drawing<S, S, B>[] = []

    /**
     * Creates a lathe.
     * @param initialDrawing The initial drawing
     * @param finalDrawing The final drawing
     */
    public constructor(
        private readonly initialDrawing: Drawing<B, S, B> = Lathe.BLANK_DRAWING,
        private readonly finalDrawing: Drawing<S, P, B> = Lathe.BLANK_DRAWING,
    ) {
    }

    /**
     * Adds a semi drawing.
     * @param semiDrawing
     */
    public addSemiDrawing(semiDrawing: Drawing<S, S, B>): void {
        this.semiDrawingList.push(semiDrawing)
    }

    /**
     * Process a blank, and returns a product.
     */
    public process(blank: B, material: any): P {
        let semi = this.initialDrawing(blank, material, blank)

        this.semiDrawingList.forEach(semiDrawing => {
            semi = semiDrawing(semi, material, blank)
        })

        return this.finalDrawing(semi, material, blank)
    }
}