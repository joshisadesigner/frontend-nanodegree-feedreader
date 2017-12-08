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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        let array = allFeeds;

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         * (Project Details #8)
         */  
        it(`have url and it's not empty`, function() {
            /* Variable to hold current url */
            let feedUrl;
            /* Loop through each each field to test */
            for(let i = 0; i < array.length; i++ ){
                /* Change variable to current index */
                feedUrl = array[i].name;
                /* Checks if the current feed url exists */
                expect( feedUrl ).toBeDefined();
                /* Checks if the current feed url isn't empty */
                expect( feedUrl.length ).not.toBe( 0 );
            }
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         * (Project Details #9)
         */
        it(`have name and it's not empty`, function() {
            /* Variable to hold current url */
            let feedName;
            /* Loop through each each field to test */
            for(let i = 0; i < array.length; i++ ){
                /* Change variable to current index */
                feedName = array[i].name;
                /* Checks if the current feed name exists */
                expect( feedName ).toBeDefined();
                /* Checks if the current feed name isn't empty */
                expect( feedName ).not.toBe( null );
            }
        });
    });

    /* Write a new test suite named "The menu" (Project Details #10)*/
    describe(`The menu`, function() {
        /* Create a variable for the body element of the document */
        let documentBody = $('body');
        /* Create a variable for the menu icon on the html header */
        let menuIcon = $('.menu-icon-link');

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         * (Project Details #11)
         */
        it(`is hidden by default`, function() {
            /* Checks that the body element has the 'menu-hidden' class */
            expect(documentBody.attr('class')).toEqual('menu-hidden');
        });


        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         * (Project Details #12)
        */        
        it(`changes its visibility when clicked`, function() {
            /* Triggers a click on the menu icon on the html header */
            $('.menu-icon-link').trigger('click');
            /* Checks if body element doesn't has the class 'menu-hidden' */
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /* Triggers a click on the menu icon on the html header */
            $('.menu-icon-link').trigger('click');
            /* Checks if body element has the class 'menu-hidden' */
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" (Project Details #13) */
    describe(`Initial Entries`, function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         * (Project Details #14)
         */
        /* Calls function before spec */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it(`are completed`, function() {
            /* Cheks if feeds isn't empty */
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Write a new test suite named "New Feed Selection" (Project Details #15) */
    describe(`New Feed Selection`, function() {
        
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * (Project Details #16)
         */
        /* Create variables for content loaded on feed */
        let contentBefore,
            contentAfter;

        /* Calls function before spec */
        beforeEach(function(done) {
            /* Calls loadFeed function to load second url source */
            loadFeed(1, function() {
                /* Set variable to the actual text content on '.feed' */
                contentBefore = $('.feed').text();
                /* Calls loadFeed function to load third url source */
                loadFeed(2, function() {
                    /* Set variable to the changed text content on '.feed' */
                    contentAfter = $('.feed').text();
                    done();
                });
            });
        });

        it(`changes on new content loaded`, function() {
            /* Checks if text on feed has been changed */
            expect(contentAfter).not.toBe(contentBefore);
        });
    });
}());
