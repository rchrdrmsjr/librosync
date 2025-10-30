import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AnnoncementCard = ({ announcement }) => {
  return (
    <Card
      key={announcement.id}
      className="rounded-xl shadow-md hover:shadow-lg transition flex flex-col py-4"
    >
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">
            📅 {new Date(announcement.createdAt).toLocaleString()}
          </span>
        </div>
        <CardTitle className="text-lg font-semibold text-primary">
          {announcement.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 leading-relaxed">
          {announcement.content}
        </p>
      </CardContent>
    </Card>
  );
};

export default AnnoncementCard;
