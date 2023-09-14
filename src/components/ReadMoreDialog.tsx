import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Article } from "../context/types";
interface ReadMoreComponentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArticle: Article | null;
}

const ReadMoreDialog: React.FC<ReadMoreComponentProps> = ({
  isOpen,
  onClose,
  selectedArticle,
}) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 max-w-screen-md">
              <div className="absolute top-0 right-0 pt-2 pr-2">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-full"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  &#x2715;
                </button>
              </div>
              <div className="sm:flex sm:items-start sm:justify-between">
                <div className="">
                  {selectedArticle && (
                    <>
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            {selectedArticle.sport.name},{" "}
                            {selectedArticle.title}
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {selectedArticle.date}
                            </p>
                            <img
                              src={selectedArticle.thumbnail}
                              alt={selectedArticle.title}
                              className="w-full h-auto mx-auto mt-4"
                            />
                            <p className="mt-4 text-gray-900 text-justify">
                              {selectedArticle.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ReadMoreDialog;
