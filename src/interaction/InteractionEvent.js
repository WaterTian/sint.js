/**
 * Event class that mimics native DOM events.
 *
 * @class
 * @memberof SINT.interaction
 */
export default class InteractionEvent
{
    /**
     *
     */
    constructor()
    {
        /**
         * Whether this event will continue propagating in the tree
         *
         * @member {boolean}
         */
        this.stopped = false;

        /**
         * The object which caused this event to be dispatched.
         * For listener callback see {@link SINT.interaction.InteractionEvent.currentTarget}.
         *
         * @member {SINT.DisplayObject}
         */
        this.target = null;

        /**
         * The object whose event listener’s callback is currently being invoked.
         *
         * @member {SINT.DisplayObject}
         */
        this.currentTarget = null;

        /**
         * Type of the event
         *
         * @member {string}
         */
        this.type = null;

        /**
         * InteractionData related to this event
         *
         * @member {SINT.interaction.InteractionData}
         */
        this.data = null;
    }

    /**
     * Prevents event from reaching any objects other than the current object.
     *
     */
    stopPropagation()
    {
        this.stopped = true;
    }

    /**
     * Resets the event.
     */
    reset()
    {
        this.stopped = false;
        this.currentTarget = null;
        this.target = null;
    }
}
