export default class Image {
    id: string;
    repository: string;
    tag: string;
    creation_date: string;
    size: string;

    constructor(id: string, repository: string, tag: string, creation_date: string, size: string) {
        this.id = id;
        this.repository = repository;
        this.tag = tag;
        this.creation_date = creation_date;
        this.size = size;
    }
}
