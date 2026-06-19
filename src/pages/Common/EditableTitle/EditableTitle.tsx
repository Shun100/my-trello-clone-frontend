import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from "react";

type EditableTitleProps = {
  title: string,
  setTitle: (t: string) => void,
  onBlur: (e: React.FocusEvent<HTMLHeadingElement>) => void,
}
export function EditableTitle({ title, setTitle, onBlur }: EditableTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (!titleRef.current?.contains(e.target as Node)) {
        setTitle(titleRef.current?.textContent?.trim() ?? '');
      }

      document.addEventListener('mousedown', handleClickOutSide);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    }
  });

  return (
    <>
      <h4
        className="mb-0 pb-1 lane-title"
        contentEditable
        suppressContentEditableWarning
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // 改行を防ぐ
            e.currentTarget.blur(); // フォーカスを外す
          }
        }}
        ref={titleRef}
      >
        {title}
      </h4>
    </>
  );
}