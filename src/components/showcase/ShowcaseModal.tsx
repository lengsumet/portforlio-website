import React from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import LiveStats from '@/components/showcase/LiveStats';
import { FaArrowRight } from 'react-icons/fa';

interface ShowcaseItem {
  id: number;
  title: string;
  longDescription: string;
  price: number;
  tags: string[];
  livePreview: string;
  gallery: string[];
}

interface ShowcaseModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
}

const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const systems = ['wms', 'pos', 'crm', 'tms', 'ims', 'scms', 'pms', 'dashboard'] as const;
  const matchedSystem = systems.find(s => item.livePreview?.includes(s));

  return (
    <Modal isOpen={!!item} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="relative h-72 rounded-xl overflow-hidden mb-3" style={{ backgroundColor: 'var(--bg-float)' }}>
            <Image src={item.gallery[0]} alt={item.title} fill className="object-cover" />
          </div>
          <div className="flex gap-2">
            {item.gallery.map((img, i) => (
              <div
                key={i}
                className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0"
                style={{ border: '1px solid var(--border)' }}
              >
                <Image src={img} alt={`${item.title} ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.15em] mb-2"
            style={{ color: 'var(--text-4)', fontFamily: 'var(--font-body)' }}
          >
            Project
          </p>
          <h2
            className="text-2xl mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--text-1)' }}
          >
            {item.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded"
                style={{
                  backgroundColor: 'var(--bg-float)',
                  color: 'var(--text-4)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}
          >
            {item.longDescription}
          </p>

          {matchedSystem && <LiveStats system={matchedSystem} />}

          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p
              className="text-2xl tabular"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: 'var(--text-1)' }}
            >
              ${item.price}
            </p>
            <div className="flex gap-3">
              <a href={item.livePreview} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  Live Preview
                  <FaArrowRight size={9} />
                </Button>
              </a>
              <Button size="sm">Purchase</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowcaseModal;
