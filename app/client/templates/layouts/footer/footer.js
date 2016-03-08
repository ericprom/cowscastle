/*****************************************************************************/
/* Footer: Event Handlers */
/*****************************************************************************/
Template.Footer.events({
});

/*****************************************************************************/
/* Footer: Helpers */
/*****************************************************************************/
Template.Footer.helpers({
    copyYear: function (){
        var d = new Date();
        var n = d.getFullYear();
        return n;
    }
});

/*****************************************************************************/
/* Footer: Lifecycle Hooks */
/*****************************************************************************/
Template.Footer.onCreated(function () {
});

Template.Footer.onRendered(function () {
});

Template.Footer.onDestroyed(function () {
});
