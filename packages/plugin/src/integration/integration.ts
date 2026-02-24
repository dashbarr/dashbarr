import { Plugin } from "../plugin.js";

export abstract class Integration extends Plugin {
    /**
     * #### The name of the integration.
     * This is used to identify the integration in the user's dashboard.
     */
    public abstract override readonly name: string;

    /**
     * #### The description of the integration.
     * This is used to describe the integration in the user's dashboard.
     */
    public abstract override readonly description: string;
}
