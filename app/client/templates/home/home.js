var MAP = 'nearbyCows';
/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
    'click .search-workspace-btn' : function(event, template){
        event.preventDefault();
        var keyword = $('input[name=search-home-text]').val();
        var search = {
            index: 'cowscastle',
            type: 'space',
            query: {
                match: {
                    _all:{
                      "query": keyword,
                      "analyzer": "thai"
                    },
                }
            }
        }
        console.log(search);
        Meteor.call('elastic/search',search,function(err,resp){
            console.log('log home:',err,resp);
            var ids = _.map(resp,function(item){return item._id});
            spaceIDs.set(ids);
            console.log(ids);
            Router.go('search', {keyword:keyword});
        });

    },
});
/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
    exampleMapOptions: CowsMap.MapOptions
});
/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function() {});
Template.Home.onRendered(function() {
    GoogleMaps.load();
    GoogleMaps.ready(MAP, function(map) {
        CowsMap.currentMap.set(MAP);
        CowsMap.currentPosition();
        CowsMap.zoom(15);
    });
});
Template.Home.onDestroyed(function() {});
