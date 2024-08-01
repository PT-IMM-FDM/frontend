import React from 'react'
import MenuHeader from '../../component/MenuHeader';
import { Skeleton } from '@mui/material';

function SkeletonDashboard() {
    return (
        <>
          <MenuHeader title={"Dashboard FDM"} />
          <div className="grid grid-row-2 gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.200" }}
                  variant="rounded"
                  height={180}
                  className="mb-4"
                />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "grey.200" }}
                    variant="rounded"
                    height={60}
                  />
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "grey.200" }}
                    variant="rounded"
                    height={60}
                  />
                  <Skeleton
                    animation="wave"
                    sx={{ bgcolor: "grey.200" }}
                    variant="rounded"
                    height={60}
                  />
                </div>
              </div>
              <div className="flex">
                <Skeleton
                  animation="wave"
                  sx={{ bgcolor: "grey.200" }}
                  variant="rounded"
                  height={255}
                  width="100%"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.200" }}
                variant="rounded"
                height={300}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.200" }}
                variant="rounded"
                height={300}
              />
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.200" }}
                variant="rounded"
                height={300}
                className="col-span-2"
              />
            </div>
          </div>
        </>
      );
}

export default SkeletonDashboard