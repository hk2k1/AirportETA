// app/dashboard/overview/page.tsx
"use client"
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { dashboardConfig } from "@/config/dashboard";
import { EstPaxWaitTime } from "@/components/Dashboard/overview/EstPaxWaitTime";
import { EstTaxiWaitTime } from "@/components/Dashboard/overview/EstTaxiWaitTime";
import { FlightInformation } from "@/components/Dashboard/overview/FlightInformation";
import { AlertBulletins } from "@/components/Dashboard/overview/AlertBulletins";
import { EstTaxiQueueSupply } from "@/components/Dashboard/overview/EstTaxiQueueSupply";
import { Disable } from '@/components/Dashboard/Disable';

const components = {
  EstPaxWaitTime,
  EstTaxiWaitTime,
  FlightInformation,
  AlertBulletins,
//   EstTaxiQueueSupply,
};

const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component = components[id];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Component />
    </div>
  );
};

export default function OverviewPage() {
  const NAV_INDEX = 0;
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Overview', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/overview'},
  ];

  const [items, setItems] = useState([
    'EstPaxWaitTime',
    'EstTaxiWaitTime',
    'FlightInformation',
    'AlertBulletins',
    // 'EstTaxiQueueSupply',
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <PageContainer scrollable={true}>
      <div className="h-screen flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">TMS Operator Dashboard Overview 🖥️</h2>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items}>
            <div className="flex-grow grid gap-2 overflow-hidden">   
            <div className="flex-grow grid grid-cols-4 gap-2 overflow-hidden">
              {items.map((id) => (
                <Disable key={id} settingKey={id}>
                  <SortableItem key={id} id={id} />
                </Disable>
              ))}
            </div>
            <div>
                <EstTaxiQueueSupply />
            </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </PageContainer>
  );
}