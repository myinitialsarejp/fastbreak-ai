enum Sports {
  BASEBALL = "Baseball",
  BASKETBALL = "Basketball",
  FOOTBALL = "Football",
  HOCKEY = "Hockey",
  PICKLEBALL = "Pickleball",
  SOCCER = "Soccer",
  SWIMMING = "Swimming",
  TENNIS = "Tennis",
  VOLLEYBALL = "Volleyball",
}

enum Venue {
    STADIUM_A = "Stadium A",
    STADIUM_B = "Stadium B",
    ARENA_A = "Arena A",
    FIELD_A = "Field A",
    COURT_A = "Court A",
}

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number', minimum: 1 },
    eventName: { type: 'string', minLength: 3 },
    sportType: { type: Sports },
    dateTime: { type: 'string', format: 'date-time' },
    description: { type: 'string', minLength: 10},
    venues: {
      type: 'array',
      items: {
        type: Venue,
      },
      minItems: 1,
      uniqueItems: true,
      }
  },
  required: ['id', 'eventName', 'sportType', 'dateTime', 'description'],
};