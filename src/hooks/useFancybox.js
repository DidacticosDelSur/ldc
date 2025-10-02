import { useState, useEffect } from "react";

import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function useFancybox(options = {}) {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    if (root) {
      Fancybox.bind(root, "[data-fancybox]", options);
      return () => Fancybox.unbind(root);
    }
  }, [root, options]);

  return [setRoot];
}

/* 

import { useState, useEffect } from "react";

import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function useFancybox(options = {}) {
  const [root, setRoot] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (root) {
      Fancybox.bind(root, "[data-fancybox]", {
        ...options,
        on: {
          reveal: () => setIsOpen(true),
          destroy: () => setIsOpen(false),
        }
      });


      return () => {
        Fancybox.unbind(root);
      };
    }
  }, [root, options]);

  return [setRoot, isOpen];
} */