import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Calendar } from "@/components/ui/calendar"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { MainView } from "./MainView";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  // async function greet() {
  //   const newLocal: string[] = await invoke("localfiles", { extensions: ["salut"] });
  //   console.log("greet called", newLocal.join(", "))
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   //setGreetMsg(await invoke("greet", { name }));
  // }


  return (<Provider store={store}><MainView /></Provider>);
}

export default App;
