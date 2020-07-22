export default class Container {
    id: string;
    image: string;
    command: string;
    creation_date: string;
    status: string;

    constructor(id: string, image: string, command: string, creation_date: string, status: string) {
        this.id = id;
        this.image = image;
        this.command = command;
        this.creation_date = creation_date;
        this.status = status;
    }
}
