import { Card, Skeleton } from "@heroui/react";
import { Selectors } from "../redux/selectors";

export const LoadSkeleton: React.FC = () => {
    const {filteredPizzas} = Selectors();

    return (
        <div className="mx-auto mt-6 flex gap-x-32 flex-wrap justify-center gap-y-20">
            {filteredPizzas.slice(0, 8).map((_, index) => (
                <Card key={index} className="space-y-5" radius="lg">
                    <Skeleton className="md:w-[600px] md:h-[450px] xs:h-[300px] sm:w-[600px] sm:h-[450px] xs:w-[280px]">
                        <div className="w-[600px] xs:w-[260px] md:h-[300px] xs:h-[200px] bg-default-300" />
                    </Skeleton>
                </Card>
            ))}
        </div>
    );
}