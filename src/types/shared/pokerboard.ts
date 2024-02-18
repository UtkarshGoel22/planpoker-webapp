export interface PokerboardData {
  id: string
  manager: string
  name: string
  status: string
  createdBy: string
  deckType: "EVEN" | "FIBONACCI" | "ODD" | "SERIAL"
}
