import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TbMessageChatbot } from "react-icons/tb";

interface FAQItem {
  q: string;
  a: string;
}

const faqData: FAQItem[] = [
  {
    q: "What is your return policy rsefryjmh tgrethngf drhnfgfaengjy hfsgfhdg ds?",
    a: "You can return items within 30 days is your return policy rsefryjmh tgrethngf drhnfgfaengjy hfsgfhdg ds",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes, we offer free shipping on orders over $50.",
  },
  {
    q: "How can I contact support erfergf wergfewrgf g?",
    a: "You can email us at info@btjalphatechnology.com",
  },
  {
    q: "What is your return policy rsefryjmh tgrethngf drhnfgfaengjy hfsgfhdg ds?",
    a: "You can return items within 30 days is your return policy rsefryjmh tgrethngf drhnfgfaengjy hfsgfhdg ds",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes, we offer free shipping on orders over $50.",
  },
  {
    q: "How can I contact support erfergf wergfewrgf g?",
    a: "You can email us at info@btjalphatechnology.com",
  },
  {
    q: "What is your return policy rsefryjmh tgrethngf drhnfgfaengjy hfsgfhdg ds?",
    a: "You can return items within 30 days is your return policy rsefryjmh tgrethngf drhnfgfaengjy hfsgfhdg ds",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes, we offer free shipping on orders over $50.",
  },
  {
    q: "How can I contact support erfergf wergfewrgf g?",
    a: "You can email us at info@btjalphatechnology.com",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<FAQItem | null>(
    null
  );

  return (
    <>
      <div className="relative">
        {/* Chatbot Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-[#7B48A5] text-white rounded-full p-3 max-sm:p-2 shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <TbMessageChatbot className="text-2xl" />
        </button>

        {/* Chatbot Window with animation */}
        <div
          className={`fixed bottom-2 z-[9999] max-sm:bottom-0 right-2 max-sm:right-0 w-96 max-sm:w-full bg-white rounded-lg shadow-xl border flex flex-col overflow-hidden transform transition-all duration-300 origin-bottom-right ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Header */}
          <div className="flex w-full z-50 justify-between items-start text-center p-3 bg-gradient-to-r from-[#7B48A5] to-purple-800">
            <div className="text-white font-semibold py-2">Admirer Chatbot</div>
            <IoIosArrowDown
              className="text-white font-semibold text-[20px] mt-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Content */}
          <div className="p-3 flex-1 overflow-auto z-50">
            {/* Welcome message */}

            {!selectedQuestion ? (
              <>
                <div className="flex flex-row space-y-2 mb-4 z-50">
                  <img
                    src="/logo/iconn.png"
                    className="w-4 self-end mb-2 mr-2"
                    alt=""
                  />
                  <div className="flex gap-2 flex-col">
                    <div className="bg-gray-100 rounded-lg px-4 py-4 w-fit">
                      <p>Hi 👋, Welcome to Admirer!</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-4 w-fit">
                      <p>How can I help you today?</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2.5 h-[240px] text-start flex flex-col items-end">
                  {faqData.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedQuestion(item)}
                      className="p-2.5 pl-3 bg-white border border-[#7b48a5] font-semibold rounded-[20px] w-[280px] max-sm:w-[80%] text-[#7b48a5] leading-5 cursor-pointer hover:bg-[#7b48a5] hover:text-white transition-colors"
                    >
                      {item.q}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="text-start space-y-4">
                <div className="flex flex-row space-y-2 mb-4">
                  {/* <img
                    src="/logo/iconn.png"
                    className="w-4 self-end mb-2 mr-2"
                    alt=""
                  /> */}
                  <div className="flex gap-2 flex-col ml-5">
                    <div className="bg-gray-100 rounded-md px-4 py-4 w-fit">
                      <p>Hi 👋, Welcome to Admirer!</p>
                    </div>
                    <div className="bg-gray-100 rounded-md px-4 py-4 w-fit">
                      <p>How can I help you today?</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3  max-sm:h-[70%] text-start flex flex-col items-end">
                  <li
                    key={1}
                    className="p-2.5 pl-3 bg-white border border-[#7b48a5] font-semibold rounded-[20px] w-[280px] max-sm:w-[80%] text-[#7b48a5] leading-5 cursor-pointer hover:bg-[#7b48a5] hover:text-white transition-colors"
                  >
                    {selectedQuestion.q}
                  </li>
                </ul>
                <div className="flex flex-row mb-4">
                  <img
                    src="/logo/iconn.png"
                    className="w-4 self-end mb-3 mr-2"
                    alt=""
                  />
                  <div className="bg-gray-100 rounded-lg px-4 py-4 w-[85%]">
                    <p className="leading-5">{selectedQuestion.a}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-sm text-[#7b48a5] underline"
                >
                  ← Return to Menu
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2 text-xs text-gray-500 border-t">
            Powered by BTJ Admirer
          </div>
        </div>
      </div>
    </>
  );
}
