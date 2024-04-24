"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const AQuiz = ({
  index,
  question,
  options,
  answerKey,
}: {
  index: number;
  question: string;
  options: string[];
  answerKey: string;
}) => {
  console.log("Answer key", answerKey);

  return (
    <div className="bg-gray-700 hover:bg-sky-700 p-4 rounded-lg shadow-md mt-2 ">
      <h2 className="text-white text-lg mb-4">{`${index + 1}. ${question}`}</h2>
      <RadioGroup>
        {/* {options.map((option, index) => (
          <div
            key={index}
            className=" flex  items-center space-x-2 hover:cursor-pointer"
          >
            <div className=" flex items-center space-x-1">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}></Label>
            </div>
            <div className=" flex items-center flex-wrap">{option}</div>
          </div>
        ))} */}

        {/* option A */}
        <div className="flex  items-center space-x-2 hover:cursor-pointer">
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="0" id={`option-0`} />
            <Label htmlFor={`option-0`}></Label>
          </div>
          <div className="flex items-center flex-wrap">{options[0]}</div>
        </div>

        {/* option B */}
        <div className="flex  items-center space-x-2 hover:cursor-pointer">
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="1" id={`option-1`} />
            <Label htmlFor={`option-1`}></Label>
          </div>
          <div className="flex items-center flex-wrap">{options[1]}</div>
        </div>

        {/* option C */}
        <div className="flex  items-center space-x-2 hover:cursor-pointer">
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="2" id={`option-2`} />
            <Label htmlFor={`option-2`}></Label>
          </div>
          <div className="flex items-center flex-wrap">{options[2]}</div>
        </div>

        {/* option D */}
        <div className="flex  items-center space-x-2 hover:cursor-pointer">
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="3" id={`option-3`} />
            <Label htmlFor={`option-3`}></Label>
          </div>
          <div className="flex items-center flex-wrap">{options[3]}</div>
        </div>
      </RadioGroup>
    </div>
  );
};
