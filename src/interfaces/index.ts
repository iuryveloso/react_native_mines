export interface MinesInterface {
    mode: 'main' | 'field'
    difficult: 'easy' | 'medium' | 'hard'
    action: 'visible' | 'marked' | 'unknown'
}

export interface ItemsNumberInterface {
    easy: number
    medium: number
    hard: number
}

export interface PlaceInterface {
    status: 'hidden' | 'marked' | 'unknown' | 'visible'
    value:
    | 'none'
    | 'adj1'
    | 'adj2'
    | 'adj3'
    | 'adj4'
    | 'adj5'
    | 'adj6'
    | 'adj7'
    | 'adj8'
    | 'mine'
}
