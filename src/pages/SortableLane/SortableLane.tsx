import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SortableLane.css';
import SortableCard from '../SortableCard/SortableCard';
import AddCardButton from '../AddCardButton/AddCardButton';
import type { Lane } from '../../modules/lane/lane.entity';
import { laneRepository } from '../../modules/lane/lane.repository';
import { useAtom } from 'jotai';
import { boardAtom } from '../../modules/board/board.state';
import { useEffect, useRef, useState } from 'react';

type SortableLaneProps = {
  lane: Lane,
}

function SortableLane({ lane }: SortableLaneProps) {
  const [board, setBoard] = useAtom(boardAtom);
  const [title, setTitle] = useState<string>(lane.title);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const deleteLane = async () => {
    await laneRepository.delete(lane.id);

    if (board) {
      const currentLanes = board.lanes;
      const updatedLanes = currentLanes
        .filter(l => l.id !== lane.id)
        .map(l => ({
          ...l,
          position: l.position > lane.position
            ? l.position - 1
            : l.position
        }));

      setBoard({
        ...board,
        lanes: [...updatedLanes],
      });
    }

  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!titleRef.current?.contains(e.target as Node)) {
        setTitle(titleRef.current?.textContent?.trim() ?? '');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {
        <div className='d-flex justify-content-center pt-4'>
          <div className='bg-body-secondary border p-4 rounded'
                style={{ width: '100%', maxWidth: '450px' }}>
            <div className="d-flex align-items-center justify-content-between">

            <h4
              className="mb-0 pb-1 lane-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={e => setTitle(e.target.textContent.trim())}
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
              
              <i
                className="bi bi-trash delete-button"
                onClick={deleteLane}
              ></i>
            </div>
            {
              lane.cards.map(card => <SortableCard card={card} key={card.id} />)
            }
            <AddCardButton/>
          </div>
        </div>
      }
    </>
  );
}

export default SortableLane;