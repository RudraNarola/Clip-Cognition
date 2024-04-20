"use client";
import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  const data = [
    {
      name: "Mit Beladiya",
      totalPoint: "20",
      totalQuiz: "2",
    },
    {
      name: "Jaivik Kalathiya",
      totalPoint: "50",
      totalQuiz: "3",
    },
    {
      name: "Niraj Umeratiya",
      totalPoint: "60",
      totalQuiz: "1",
    },
    {
      name: "Tirth Moradiya",
      totalPoint: "10",
      totalQuiz: "1",
    },
    {
      name: "Mihir Mungara",
      totalPoint: "30",
      totalQuiz: "2",
    },
    {
      name: "Ronit Korat",
      totalPoint: "90",
      totalQuiz: "6",
    },
    {
      name: "Meet Khanpara",
      totalPoint: "90",
      totalQuiz: "6",
    },
  ];

  data.sort((a, b) => {
    // Sort by total point
    if (parseInt(a.totalPoint) !== parseInt(b.totalPoint)) {
      return parseInt(b.totalPoint) - parseInt(a.totalPoint);
    }
    // If total points are same, sort by total quiz
    if (parseInt(a.totalQuiz) !== parseInt(b.totalQuiz)) {
      return parseInt(a.totalQuiz) - parseInt(b.totalQuiz);
    }
    // If total quiz is also same, sort by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <Table className="w-2/4 mx-auto my-20 rounded-lg bg-gray-900 shadow-lg shadow-stone-50/50 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-103 hover:bg-gray-950 duration-1000">
        <TableHeader>
          <TableRow className="hover:bg-black-50">
            <TableHead className="p-8 text-center text-2xl  w-[4/5] text-stone-50">
              Name
            </TableHead>
            <TableHead className="text-center text-2xl text-stone-50">
              Total Quiz
            </TableHead>
            <TableHead className="text-center text-2xl  text-stone-50">
              Total Point
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-violat-50 text-stone-50 ">
          {data.map((invoice) => (
            <TableRow key={invoice.name}>
              <TableCell className="text-xl text-center">
                {invoice.name}
              </TableCell>
              <TableCell className="text-xl text-center">
                {invoice.totalQuiz}
              </TableCell>
              <TableCell className="text-xl text-center">
                {invoice.totalPoint}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
