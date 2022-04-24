import { useState } from "react";

const MENU_HEIGHT = 150;

const allowedTags = [
    {
        id: "page-title",
        tag: 'h1',
        label: "Page Title"
    },
    {
        id: "heading",
        tag: "h2",
        label: "Heading"
    },
    {
        id: "subheading",
        tag: "h3",
        label: "Subheading",
    },
    {
        id: "paragraph",
        tag: "p",
        label: "Paragraph"
    }
];

interface Props {

}

const SelectMenu = (props: any) => {
    const [items, setItems] = useState(allowedTags);
    const [selectedItem, setSelectedItem] = useState(0);
    const [command, setCommand] = useState("");

    const keyDownHandler = (e: any) => {
        switch (e.key) {
            case "Enter":
              e.preventDefault();
              props.onSelect(items[selectedItem].tag);
              break;
            case "Backspace":
              if (!command) props.close();
              setCommand(command.substring(0, command.length - 1));
              break;
            case "ArrowUp":
              e.preventDefault();
              const prevSelected = selectedItem === 0 ? items.length - 1 : selectedItem - 1;
              setSelectedItem(prevSelected);
              break;
            case "ArrowDown":
            case "Tab":
              e.preventDefault();
              const nextSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
              setSelectedItem(nextSelected);
              break;
            default:
              setCommand(command + e.key);
              break;
          }
    }

    const x = props?.position?.x;
    const y = props?.position?.y;

    const positionAttributes = { top: y, left:x};

    return (
        <div className="selectMenu" style={positionAttributes}>
        <div className="Items">
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItem;
          return (
            <div
              className={isSelected ? "selected" : ""}
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => props.onSelect(item.tag)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
        </div>
    )
}

export default SelectMenu;
