import { useState } from "react";

export default function FilterButton(props) {

  return (
    <button
      className={"border-2 border-black p-1 w-1/3 border font-semibold " + (props.isPressed && "bg-black text-white")}
      onClick={() => props.setFilter(props.name)}
    >
      {props.name}
    </button>
  )
}