import { Button } from "@/components/ui/button";
import React from "react";

const CourseBox = () => {
  return (
    <div className="flex flex-row p-4 gap-10">
      <div className="w-1/2">
        <img
          src="/carousel1.webp"
          alt=""
          className="w-full object-fill h-[400px]"
        />
      </div>
      <div className="w-1/2">
        <h1 className="text-right font-bold text-6xl text-gray-600">
          React Redux
        </h1>
        <h1 className="text-right font-medium text-xl text-gray-500">
          By Ritesh Das
        </h1>
        <p className="text-justify my-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolores
          iste impedit fugit maxime, cum, consectetur ut molestiae voluptates, a
          reprehenderit similique ducimus autem veritatis tempora perferendis
          expedita! Explicabo possimus blanditiis molestiae libero dolorem?
          Inventore quasi quibusdam eaque fugiat molestiae aliquid, minima,
          facere molestias unde voluptate, exercitationem aperiam? Incidunt
          reprehenderit facere minima iusto architecto laborum harum voluptates
          totam, exercitationem amet unde. Doloribus dolore cum quis sequi,
          facere sunt cumque. Labore quam cupiditate autem saepe incidunt ab
          nobis, tempora doloribus temporibus iure beatae repellendus sapiente
          sed unde voluptate et amet eum enim. Itaque, sed quisquam aut eum
          voluptatum animi? Facilis, laboriosam?
        </p>
        <div className="text-right">
      <Button className="w-30 bg-blue-600 hover:bg-blue-700">Buy</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseBox;
