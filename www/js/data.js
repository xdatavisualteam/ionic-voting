var text = {
  loremIpsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio.",

  filters: {
    fairness: "Only users who have provided their own information may use this filter. This helps ensure fairness and helps us collect enough data to filter responses. ",
    privacy: "Information you provide is private to you only and will never be displayed to other users. Additionally, we only allow filtering when the demographic option has at least 10 respondents in order to protect your privacy. ",
    mayChange: "You may change this in your profile at any time."
  }
}

var questions = [
	{
	  id: 1,
	  category: "sport",
	  q: "Who will win the NBA Finals next year?",
	  asker: "Tyler Dalton",
	  type: "text",
	  detail: "Will Golden State keep their regular-season success going and repeat?  Was it just luck that Cleveland didn't win last year?  Will Tim Duncan get one last title with a great supporting cast?  Or do you think another team has what it takes to pull off an upset?",
	  posted: "20 min",
	  recommend_reason: "Recommended for people with basketball interest.",
	  answers: [
			{
			  id: 1,
			  name: "Golden State Warriors",
			  votes: 100,
			  reasons: [
          { id: 1, name: "They have the MVP", votes: 55, details: text.loremIpsum },
          { id: 2, name: "Draymond Green improved", votes: 20, details: text.loremIpsum },
          { id: 3, name: "73-9?", votes: 20, details: text.loremIpsum },
          { id: 4, name: "Great coaching", votes: 5, details: text.loremIpsum }
			  ]
			},
			{
			  id: 2,
			  name: "Cleveland Cavaliers",
			  votes: 60,
			  reasons: [
          { id: 1, name: "King James", votes: 23, details: text.loremIpsum },
          { id: 2, name: "Their team is healthy", votes: 17, details: text.loremIpsum },
          { id: 3, name: "Last year was just luck", votes: 10, details: text.loremIpsum },
          { id: 4, name: "Destiny.", votes: 10, details: text.loremIpsum }
			  ]
			},
			{
			  id: 3,
			  name: "San Antonio Spurs",
			  votes: 20,
			  reasons: [
          { id: 1, name: "Dynasty!", votes: 10, details: text.loremIpsum },
          { id: 2, name: "Great coaching", votes: 5, details: text.loremIpsum },
          { id: 3, name: "They play team basketball", votes: 3, details: text.loremIpsum },
          { id: 4, name: "Hall of Famers", votes: 3, details: text.loremIpsum }
			  ]
			},
			{
			  id: 4,
			  name: "Oklahoma City Thunder",
			  votes: 20,
			  reasons: [
          { id: 1, name: "2 of the NBA's top 10 players", votes: 8, details: text.loremIpsum },
          { id: 2, name: "Durant hasn't won it all yet", votes: 7, details: text.loremIpsum },
          { id: 3, name: "They're hungry", votes: 4, details: text.loremIpsum },
          { id: 4, name: "Westbrook: triple doubles", votes: 1, details: text.loremIpsum },
          { id: 5, name: "Never again", votes: 1, details: text.loremIpsum },
          { id: 6, name: "This is my city", votes: 1, details: text.loremIpsum }
			  ]
			},
      {
        id: 5,
        name: "Boston Celtics",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum },
          { id: 5, name: "It's about time 2", votes: 8, details: text.loremIpsum },
          { id: 6, name: "This is my city 2", votes: 7, details: text.loremIpsum },
          { id: 7, name: "New coach 2", votes: 4, details: text.loremIpsum },
          { id: 8, name: "They did really well last year 2", votes: 1, details: text.loremIpsum },
          { id: 9, name: "It's about time 3", votes: 8, details: text.loremIpsum },
          { id: 10, name: "This is my city 3", votes: 7, details: text.loremIpsum },
          { id: 11, name: "New coach 3", votes: 4, details: text.loremIpsum },
          { id: 12, name: "They did really well last year 3", votes: 1, details: text.loremIpsum },
          { id: 13, name: "It's about time 4", votes: 8, details: text.loremIpsum },
          { id: 14, name: "This is my city 4", votes: 7, details: text.loremIpsum },
          { id: 15, name: "New coach 4", votes: 4, details: text.loremIpsum },
          { id: 16, name: "They did really well last year 4", votes: 1, details: text.loremIpsum },
          { id: 17, name: "It's about time 5", votes: 8, details: text.loremIpsum },
          { id: 18, name: "This is my city 5", votes: 7, details: text.loremIpsum },
          { id: 19, name: "New coach 5", votes: 4, details: text.loremIpsum },
          { id: 20, name: "They did really well last year 5", votes: 1, details: text.loremIpsum },
          { id: 21, name: "It's about time 6", votes: 8, details: text.loremIpsum },
          { id: 22, name: "This is my city 6", votes: 7, details: text.loremIpsum },
          { id: 23, name: "New coach 6", votes: 4, details: text.loremIpsum },
          { id: 24, name: "They did really well last year 6", votes: 1, details: text.loremIpsum },
          { id: 25, name: "It's about time 7", votes: 8, details: text.loremIpsum },
          { id: 26, name: "This is my city 7", votes: 7, details: text.loremIpsum },
          { id: 27, name: "New coach 7", votes: 4, details: text.loremIpsum },
          { id: 28, name: "They did really well last year 7", votes: 1, details: text.loremIpsum },
        ]
      },
      {
        id: 6,
        name: "Dallas Mavericks",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 7,
        name: "Brooklyn Nets",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 8,
        name: "Houston Rockets",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 9,
        name: "New York Knicks",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 10,
        name: "Memphis Grizzlies",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 11,
        name: "Philadelphia 76ers",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 12,
        name: "New Orleans Pelicans",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 13,
        name: "Toronto Raptors",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 14,
        name: "Chicago Bulls",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 15,
        name: "Denver Nuggets",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 16,
        name: "Minnesota Timberwolves",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 17,
        name: "Detroit Pistons",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 18,
        name: "Indiana Pacers",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 19,
        name: "Portland Trail Blazers",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 20,
        name: "Milwaukee Bucks",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 21,
        name: "Utah Jazz",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 22,
        name: "Atlanta Hawks",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 23,
        name: "Charlotte Hornets",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 24,
        name: "LA Clippers",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 25,
        name: "Miami Heat",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 26,
        name: "Los Angeles Lakers",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 27,
        name: "Orlando Magic",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 28,
        name: "Phoenix Suns",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 29,
        name: "Washington Wizards",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
      {
        id: 30,
        name: "Sacramento Kings",
        votes: 20,
        reasons: [
          { id: 1, name: "It's about time", votes: 8, details: text.loremIpsum },
          { id: 2, name: "This is my city", votes: 7, details: text.loremIpsum },
          { id: 3, name: "New coach", votes: 4, details: text.loremIpsum },
          { id: 4, name: "They did really well last year", votes: 1, details: text.loremIpsum }
        ]
      },
	  ]
	},
  {
    id: 4,
    category: "life",
    q: "Which one of these is the cutest puppy?",
    asker: "Katrina Sharma",
    type: "image",
    posted: "30 min",
    recommend_reason: "Popular question this week.",
    answers: [
      {
        id: 1,
        name: "Shih Tzus",
        img: "http://pedigreedoghealth.org/wp-content/uploads/2010/10/Shih_Tzu.jpg",
        votes: 88,
        reasons: [
          {
            id: 1, name: "Shih Tzus for the win!", votes: 57, details: text.loremIpsum
          },
          {
            id: 2, name: "I have one of these puppies", votes: 41, details: text.loremIpsum
          },
          {
            id: 3, name: "It would win at the dog show", votes: 38, details: text.loremIpsum
          },
          {
            id: 4, name: "No Pomeranian pictured here", votes: 21, details: text.loremIpsum
          }
        ]
      },
      {
        id: 2,
        name: "Corgis",
        img: "https://pbs.twimg.com/profile_images/378800000674268962/06ce58cab26c3a0daf80cf57e5acb29b_400x400.jpeg",
        votes: 112,
        reasons: [
          {
            id: 1, name: "I'm a big fan of Corgis", votes: 33, details: text.loremIpsum
          },
          {
            id: 2, name: "It has a cute smile", votes: 19, details: text.loremIpsum
          },
          {
            id: 3, name: "He looks like he's having fun", votes: 25, details: text.loremIpsum
          }
        ]
      },
      {
        id: 3,
        name: "Yoda",
        img: "https://cdn.playbuzz.com/cdn/37a82cef-48ea-438e-a46f-499152ec0f07/2cf67a38-f0ee-49b7-84f7-30f819cf038b.jpg",
        votes: 16,
        reasons: [
          {
            id: 1, name: "This dog is so ugly he's cute", votes: 7, details: text.loremIpsum
          },
          {
            id: 2, name: "He looks like Yoda", votes: 13, details: text.loremIpsum
          },
          {
            id: 3, name: "He has a great personality", votes: 2, details: text.loremIpsum
          },
          {
            id: 4, name: "I prefer cats", votes: 8, details: text.loremIpsum
          }
        ]
      },
      {
        id: 4,
        name: "Catdog",
        img: "http://i.gr-assets.com/images/S/photo.goodreads.com/hostedimages/1380365112i/716974._SX540_.jpg",
        votes: 44,
        reasons: [
          {
            id: 1, name: "He has a cool expression", votes: 27, details: text.loremIpsum
          },
          {
            id: 2, name: "He's a cat in disguise", votes: 28, details: text.loremIpsum
          }
        ]
      }
    ]
  },
  {
    id: 2,
    category: "life",
    q: "Which country in South America is most worth visiting?",
    asker: "Katrina Sharma",
    type: "text",
    posted: "30 min",
    recommend_reason: "Recommended for people with travel interest.",
    answers: []
  },
  {
    id: 6,
    category: "work",
    q: "Which soft skill makes the most difference in promotions?",
    asker: "anonymous",
    type: "text",
    posted: "1 hour",
    answers: []
  },
   {
     id: 7,
     category: "life",
     q: "Would you take a selfie at the top of Everest?",
     asker: "anonymous",
     type: "text",
     posted: "1 day",
     recommend_reason: "Recommended for people with travel interest.",
     answers: []
   },
   {
     id: 8,
     category: "sport",
     q: "What should be the next new sport in the Summer Olympics?",
     asker: "anonymous",
     posted: "2 min",
     type: "text",
     answers: []
   },
   {
     id: 9,
     category: "tv",
     q: "How interested are you in watching the debates?",
     asker: "anonymous",
     type: "text",
     posted: "1 week",
     answers: []
   },
   {
     id: 10,
     category: "movies",
     q: "Which classic comedy is most deserving of a sequel?",
     asker: "anonymous",
     type: "text",
     posted: "20 min",
     answers: []
   },
  {
    id: 3,
    category: "tech",
    q: "What's the best unusual use for a drone?",
    asker: "anonymous",
    type: "text",
    posted: "20 min",
    answers: [
      {
        id: 1,
        name: "Spotify's PartyDrone",
        votes: 57,
        reasons: [
          {
            id: 1, name: "Too cool not to do!", votes: 35, details: text.loremIpsum
          }
        ]
      },
      {
        id: 2,
        name: "Drawing patterns of light in the air",
        votes: 16,
        reasons: [
          {
            id: 1, name: "Safe sky shows", votes: 16, details: text.loremIpsum
          }
        ]
      },
      {
        id: 3,
        name: "Drone racing",
        votes: 5,
        reasons: [
          {
            id: 1, name: "And drone betting!", votes: 4, details: text.loremIpsum
          }
        ]
      },
      {
        id: 4,
        name: "Getting closer to animals in the wild",
        votes: 38,
        reasons: [
          {
            id: 1, name: "National geographic would love this", votes: 30, details: text.loremIpsum
          },
          {
            id: 2, name: "Drones have a lot more patience to wait for animals", votes: 24, details: text.loremIpsum
          }
        ]
      },
      {
        id: 5,
        name: "Capturing video selfies with drones",
        votes: 26,
        reasons: [
          {
            id: 1, name: "Drones need personalities too", votes: 20, details: text.loremIpsum
          },
          {
            id: 2, name: "This is inevitable for the millennials", votes: 16, details: text.loremIpsum
          }
        ]
      }
    ]
  },
  {
    id: 5,
    category: "tech",
    q: "Is Mario the best video game character ever?",
    asker: "anonymous",
    type: "text",
    detail: "Mario is not only the greatest, most iconic and most memorable but he is also the most powerful. The star rod granted him invincibility as well as omnipotence and his arsenal of shrooms and flowers is a deadly arsenal. Ultimately he is a childhood memory and present day heroic character.",
    recommend_reason: "Recommended for people in your demographic.",
    posted: "10 min",
    answers: [
      {
        id: 1,
        name: "Yes",
        votes: 150,
        reasons: [
          { id: 1, name: "They have the MVP", votes: 55, details: text.loremIpsum }
        ]
      },
      {
        id: 2,
        name: "No",
        votes: 50,
        reasons: [
          { id: 1, name: "They have the MVP", votes: 55, details: text.loremIpsum }
        ]
      }
    ]
  },
   {
     id: 11,
     category: "life",
     q: "What extreme point of Earth would you most want to visit?",
     asker: "",
     type: "text",
     posted: "1 hour",
     answers: []
   },
  {
    id: 12,
    category: "life",
    q: "Guys in college, which of these kinds of girls would you be most likely to date?",
    asker: "",
    type: "text",
    posted: "1 hour",
    recommend_reason: "Recommended for people in college.",
    answers: []
  },
  {
    id: 14,
    category: "food",
    q: "How to make awesome pizza?",
    asker: "",
    type: "text",
    posted: "1 hour",
    answers: []
  },
]

var newQuestion = {
  id: 1,
  category: "",
  q: "",
  asker: "",
  type: "text",
  detail: "",
  answers: [
    {
      id: 1,
      name: "",
      votes: 0,
      percent: 0,
      reasons: [
        { id: 1, name: "", votes: 0, details: "" }
      ]
    },
    {
      id: 2,
      name: "",
      votes: 0,
      percent: 0,
      reasons: [
        { id: 1, name: "", votes: 0, details: "" }
      ]
    },
    {
      id: 3,
      name: "",
      votes: 0,
      percent: 0,
      reasons: [
        { id: 1, name: "", votes: 0, details: "" }
      ]
    },
    {
      id: 4,
      name: "",
      votes: 0,
      percent: 0,
      reasons: [
        { id: 1, name: "", votes: 0, details: "" }
      ]
    },
    {
      id: 5,
      name: "",
      votes: 0,
      percent: 0,
      reasons: [
        { id: 1, name: "", votes: 0, details: "" }
      ]
    }
  ]
};

var user = {
  demo: {
    birthday: '',
    gender: '',
    country: '',
    region: '',
    stateProvince: '',
    city: '',
    relationshipStatus: '',
    children: '',
    household: '',
    ethnicities: '',
    culturalOrigin: '',
    occupation: '',
    religion: '',
    political: ''
  },
  topics: {
    tech: { following: true, star: '★★★★★', bio: 'Nobel prize winner' },
    sport: 'Sports',
    tv: 'TV',
    movies: 'Movies',
    life: 'Life',
    work: 'Work',
    food: 'Food',
    best: 'Best of Ask the World'
  }
}

var filteringObj = {
  age: {
    id: 'age',
    all: {
      unlocked: false,
      str: "all ages"
    },
    under18: {
      unlocked: false,
      str: "Under 18"
    },
    to25: {
      unlocked: false,
      str: "18-25"
    },
    to35: {
      unlocked: false,
      str: "26-35"
    },
    to45: {
      unlocked: false,
      str: "36-45"
    },
    to55: {
      unlocked: false,
      str: "46-55"
    },
    over56: {
      unlocked: false,
      str: "Over 55"
    }
  },
  gender: {
    id: 'gender',
    all: {
      unlocked: false,
      str: 'all'
    },
    male: {
      unlocked: false,
      str: 'Male'
    },
    female: {
      unlocked: false,
      str: 'Female'
    },
    other: {
      unlocked: false,
      str: 'Other'
    }
  },
  country: {
    id: 'country',
    all: {
      unlocked: false,
      str: 'all'
    },
    USA: {
      unlocked: false,
      str: 'USA'
    },
    Canada: {
      unlocked: false,
      str: 'Canada'
    }
  },
  region: {

  },
  stateProvince: {

  },
  city: {

  },
  relationshipStatus: {
    id: 'relationshipStatus',
    all: {
      unlocked: false,
      str: 'all'
    },
    single: {
      unlocked: false,
      str: 'Single'
    },
    in: {
      unlocked: false,
      str: 'In a Relationship'
    },
    married: {
      unlocked: false,
      str: 'Married'
    },
    widowed: {
      unlocked: false,
      str: 'Widowed'
    },
    divorced: {
      unlocked: false,
      str: 'Divorced'
    },
    domestic_partner: {
      unlocked: false,
      str: 'Domestic partnership'
    }
  },
  children: {
    id: 'children',
    all: {
      unlocked: false,
      str: 'all'
    },
    yes: {
      unlocked: false,
      str: 'Yes'
    },
    no: {
      unlocked: false,
      str: 'No'
    }
  },
  household: {
    id: 'household',
    all: {
      unlocked: false,
      str: 'all types of households'
    },
    alone: {
      unlocked: false,
      str: "Living alone"
    },
    withparent: {
      unlocked: false,
      str: 'With parent(s)'
    },
    withroommate: {
      unlocked: false,
      str: 'With roommate(s)'
    },
    withpartner_spouse_nochildren: {
      unlocked: false,
      str: 'With partner/spouse, no children'
    },
    withchildren: {
      unlocked: false,
      str: 'With children'
    },
    multigenerational: {
      unlocked: false,
      str: 'Multi-generational household'
    }
  },
  ethnicities: {
    id: 'ethnicities',
    all: {
      unlocked: false,
      str: 'all'
    },
    asian: {
      unlocked: false,
      str: 'Asian'
    },
    black: {
      unlocked: false,
      str: 'Black'
    },
    lat_his: {
      unlocked: false,
      str: 'Latino/Hispanic'
    },
    mid: {
      unlocked: false,
      str: 'Middle Eastern'
    },
    native: {
      unlocked: false,
      str: 'Native Am./First Nations'
    },
    pacific: {
      unlocked: false,
      str: 'Pacific Islander'
    },
    white: {
      unlocked: false,
      str: 'White'
    },
    other: {
      unlocked: false,
      str: 'Other'
    }
  },
  culturalOrigin: {
    id: 'culturalOrigin',
    unlocked: false,
    str: ''
  },
  occupation: {
    id: 'occupation',
    unlocked: false,
    str: ''
  },
  religion: {
    id: 'religion',
    all: {
      unlocked: false,
      str: 'any religion'
    },
    protestant: {
      unlocked: false,
      str: 'Protestant'
    },
    roman: {
      unlocked: false,
      str: 'Roman Catholic'
    },
    mormon: {
      unlocked: false,
      str: 'Mormon'
    },
    christian: {
      unlocked: false,
      str: 'Christian - Other'
    },
    jewish: {
      unlocked: false,
      str: 'Jewish'
    },
    muslim: {
      unlocked: false,
      str: 'Muslim'
    },
    hindu: {
      unlocked: false,
      str: 'Hindu'
    },
    sikh: {
      unlocked: false,
      str: 'Sikh'
    },
    buddhist: {
      unlocked: false,
      str: 'Buddhist'
    },
    taoist: {
      unlocked: false,
      str: 'Taoist'
    },
    otherreligion: {
      unlocked: false,
      str: 'Other religion'
    },
    atheist: {
      unlocked: false,
      str: 'Atheist'
    },
    agnostic: {
      unlocked: false,
      str: 'Agnostic'
    },
    othernonreligious: {
      unlocked: false,
      str: 'Other  Non-religious'
    }
  },
  political: {
    id: 'political',
    all: {
      unlocked: false,
      str: 'all'
    },
    veryliberal: {
      unlocked: false,
      str: 'Very Liberal'
    },
    somewhatliberal: {
      unlocked: false,
      str: 'Somewhat Liberal'
    },
    mederate: {
      unlocked: false,
      str: 'Moderate/Centrist'
    },
    somewhatconservative: {
      unlocked: false,
      str: 'Somewhat Conservative'
    },
    veryconservative: {
      unlocked: false,
      str: 'Very Conservative'
    },
    libertarian: {
      unlocked: false,
      str: 'Libertarian'
    },
    socialist: {
      unlocked: false,
      str: 'Socialist'
    },
    green: {
      unlocked: false,
      str: 'Green'
    },
    independent: {
      unlocked: false,
      str: 'Independent'
    },
    other: {
      unlocked: false,
      str: 'Other'
    }
  },
  expertiseCat: {
    id: 'expertiseCat',
    sub_aud_1: {
      checked: false,
      str: 'Just following this topic',
      num: 10,
      star: '☆☆☆☆☆'
    },
    sub_aud_2: {
      checked: false,
      str: 'Regular hobby',
      num: 15,
      star: '★☆☆☆☆'
    },
    sub_aud_3: {
      checked: false,
      str: 'Serious hobby',
      num: 11,
      star: '★★☆☆☆'
    },
    sub_aud_4: {
      checked: false,
      str: 'Formal training or past work experience',
      num: 0,
      star: '★★★☆☆'
    },
    sub_aud_5: {
      checked: false,
      str: 'Currently work in this field',
      num: 10,
      star: '★★★★☆'
    },
    sub_aud_6: {
      checked: false,
      str: 'Distinguished professional',
      num: 0,
      star: '★★★★★'
    }
  },
  votesFromUnregistered: {

  }
}

expertiseWork = {
    id: 'expertiseCat',
    sub_aud_1: {
    checked: false,
    str: 'Just following this topic',
    num: 10,
    star: '☆☆☆☆☆'
    },
  sub_aud_2: {
      checked: false,
      str: 'Not a great deal of work experience but has learned some things worth sharing',
      num: 15,
      star: '★☆☆☆☆'
  },
  sub_aud_3: {
      checked: false,
      str: 'Significant work experience but no formal training in management or HR',
      num: 11,
      star: '★★☆☆☆'
  },
  sub_aud_4: {
      checked: false,
      str: 'Formal training in management or HR or related past work experience',
      num: 0,
      star: '★★★☆☆'
  },
  sub_aud_5: {
      checked: false,
      str: 'Currently work professionally in management or human resources',
      num: 10,
      star: '★★★★☆'
  },
  sub_aud_6: {
      checked: false,
      str: 'Distinguished professional in business management or human resources',
      num: 0,
      star: '★★★★★'
  }
}

expertiseLife = {
  id: 'expertiseCat',
  sub_aud_1: {
    checked: false,
    str: 'Just following this topic',
    num: 10,
    star: '☆☆☆☆☆'
  },
  sub_aud_2: {
    checked: false,
    str: 'Not a great deal of life experience but has learned some things worth sharing',
    num: 15,
    star: '★☆☆☆☆'
  },
  sub_aud_3: {
    checked: false,
    str: 'Significant life experience but no formal training in life coaching or counseling',
    num: 11,
    star: '★★☆☆☆'
  },
  sub_aud_4: {
    checked: false,
    str: 'Formal training in life coaching or counseling or related past work experience',
    num: 0,
    star: '★★★☆☆'
  },
  sub_aud_5: {
    checked: false,
    str: 'Currently work professionally as a life coach or counselor',
    num: 10,
    star: '★★★★☆'
  },
  sub_aud_6: {
    checked: false,
    str: 'Distinguished professional life coach or counselor',
    num: 0,
    star: '★★★★★'
  }
}

expertiseDefault = {
  id: 'expertiseCat',
  sub_aud_1: {
    checked: false,
    str: 'Just following this topic',
    num: 10,
    star: '☆☆☆☆☆'
  },
  sub_aud_2: {
    checked: false,
    str: 'Regular hobby',
    num: 15,
    star: '★☆☆☆☆'
  },
  sub_aud_3: {
    checked: false,
    str: 'Serious hobby',
    num: 11,
    star: '★★☆☆☆'
  },
  sub_aud_4: {
    checked: false,
    str: 'Formal training or past work experience',
    num: 0,
    star: '★★★☆☆'
  },
  sub_aud_5: {
    checked: false,
    str: 'Currently work in this field',
    num: 10,
    star: '★★★★☆'
  },
  sub_aud_6: {
    checked: false,
    str: 'Distinguished professional',
    num: 0,
    star: '★★★★★'
  }
}

var missionQues = questions;


var topicNameObj = {
  'tech': 'Technology',
  'sport': 'Sports',
  'tv': 'TV',
  'movies': 'Movies',
  'life': 'Life',
  'work': 'Work',
  'food': 'Food',
  'best': 'Best of Ask the World'
};


var topicTempFollow= {
  'tech': true,
  'sport': true,
  'tv': false,
  'movies': false,
  'life': true,
  'work': false,
  'food': true,
  'best': false
};


function getNewQuestions(start, count) {
  var left = questions.length - start
  if (count > left) {
    count = left;
  }
  if (count <= 0) {
    return null;
  }
  var arr = [];
  for (var i = start; i < start + count; i++) {
    arr.push(questions[i]);
  }

  return arr;
}



function setQuestionPercent(question) {

  if (!question || !question.answers) {
    return question;
  }

  var totalVotes = 0;
  angular.forEach(question.answers, function (val) {
    totalVotes += val.votes;
  });

  angular.forEach(question.answers, function (val) {
    val.percent = Math.round(100 * val.votes / totalVotes);
  });

  return question;
}