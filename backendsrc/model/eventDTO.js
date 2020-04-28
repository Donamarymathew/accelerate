class EventDTO {

    constructor(obj) {
        this.eventId = obj.eventId;
        this.title = obj.title;
        this.description = obj.description;
        this.location = obj.location;
        this.eventDate = obj.eventDate;
        this.empId = obj.empId;
        this.rewardPoints = obj.rewardPoints;
    }
}
module.exports = EventDTO;