import * as React from "react";

import { Button } from "./../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../components/ui/card";
import { Input } from "./../components/ui/input";

import { Textarea } from "./ui/textarea";
import { api } from "../utils/api";
import { Label } from "./ui/label";


export function SwotCardForm() {
const [message, setMessage] = React.useState("");

    const sendMessage = async () => {
        api.users.clickedGenerate.useMutation();
      };


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create New SWOT</CardTitle>
        <CardDescription>Try Building a SWOT in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" placeholder="Name of your Company" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="grid gap-2">
                <Label htmlFor="description">About Company</Label>
                <Textarea
                  id="description"
                  placeholder="Please a detailed summary of your idea or company."
                  onChange={(e) => setMessage(e.target.value)}
                  />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={sendMessage}>Generate</Button>
      </CardFooter>
    </Card>
  );
}

