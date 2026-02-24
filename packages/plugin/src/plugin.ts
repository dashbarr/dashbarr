export abstract class Plugin {
    /**
     * #### The name of the plugin.
     * This is used to identify the plugin in the user's dashboard.
     */
    public abstract readonly name: string;

    /**
     * #### The description of the plugin.
     * This is used to describe the plugin in the user's dashboard.
     */
    public abstract readonly description: string;
}
