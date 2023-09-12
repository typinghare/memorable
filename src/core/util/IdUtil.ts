import { Constants } from '../../Constants'

export class IdUtil {
    private static readonly MAX_ILLEGAL_ID = 0

    /**
     * Parses an ID string. Returns 0 if the ID string is not legal.
     * @param idString The ID string to parse
     */
    public static parseId(idString: string): number {
        if (idString.startsWith(Constants.ID_PREFIX)) {
            const numId = parseInt(idString.substring(1))
            return isNaN(numId) ? IdUtil.MAX_ILLEGAL_ID : numId
        } else {
            return IdUtil.MAX_ILLEGAL_ID
        }
    }

    public static isLegalId(id: number): boolean {
        return id > IdUtil.MAX_ILLEGAL_ID
    }
}