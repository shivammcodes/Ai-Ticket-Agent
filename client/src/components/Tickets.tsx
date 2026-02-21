import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { format } from "date-fns";
type TicketProps = {
  ticket: {
    title: string;
    description: string;
    createdAt?: string;
    _id?: string;
  };
};
const Tickets = ({ticket}: TicketProps) => {
  return (
    <Item className="border-2 border-accent bg-card mt-8 cursor-pointer">
  <ItemContent>
    <ItemTitle className="text-xl text-primary">{ticket.title}</ItemTitle>
    <ItemDescription className="">{ticket.description}</ItemDescription>
        <ItemDescription className="">Created at : {ticket.createdAt 
    ? format(new Date(ticket.createdAt), "dd MMM yyyy") 
    : "N/A"}</ItemDescription>
  </ItemContent>
</Item>
  )
}

export default Tickets