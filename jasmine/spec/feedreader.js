/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('contain URL', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined();
             expect(typeof feed.url === 'string').toBe(true);
             expect(feed.url.length).toBeGreaterThan(0);
           });
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('contain name', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(typeof feed.name === 'string').toBe(true);
             expect(feed.name.length).toBeGreaterThan(0);
           });
         });
    });

    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden', function() {
           var body = $('body');
           expect(body.hasClass('menu-hidden')).toBe(true);
         });


         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility', function() {
            var body = $('body');
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
          });
    });

    describe('Initial Entries', function() {
      
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('are loaded into the feed container', function() {
           var container = $('.feed');
           var entries = container.find('.entry');
           expect(entries).toBeDefined();
           expect(entries.length).toBeGreaterThan(0);
         });
    });

    describe('New Feed Selection', function() {

        // load the feed with index 1 first
        beforeEach(function(done) {
          loadFeed(1, done);
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('changes feed entries', function(done) {
           var container = $('.feed');
           var oldEntries = container.find('.entry');
           expect(oldEntries).toBeDefined();
           expect(oldEntries.length).toBeGreaterThan(0);
           
           // load another feed with index 0 and test if first entry 
           // in the container changed, i.e. new feed was loaded
           loadFeed(0, function() {
             container = $('.feed');
             var newEntries = container.find('.entry');
             expect(newEntries).toBeDefined();
             expect(newEntries.length).toBeGreaterThan(0);
             
             // html function will get the contents of first entry
             expect(newEntries.html()).not.toEqual(oldEntries.html());
             done();
           });
         });
    });

}());
