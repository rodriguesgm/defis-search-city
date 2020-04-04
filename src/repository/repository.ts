
export abstract class Repository<M> {
    abstract findBy(filters: any[]): M[];
}