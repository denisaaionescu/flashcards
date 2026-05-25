export interface Card{
    id:string
    category:string
    question:string
    answer:string
    known:boolean
    created_at:string
}
export interface CardCreate{
    category:string
    question:string
    answer:string
}
export interface CardUpdate {
    category?:string
    question?:string
    answer?:string
    known?:boolean

}