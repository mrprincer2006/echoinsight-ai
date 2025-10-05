import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mic, Square, Loader2, Save } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RecordingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecordingModal = ({ open, onOpenChange }: RecordingModalProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      toast({
        title: "Recording stopped",
        description: "Add a title and save your recording",
      });
    }
  };

  const saveRecording = async () => {
    if (!audioBlob || !title.trim()) {
      toast({
        title: "Missing information",
        description: "Please add a title for your recording",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to save recordings");
      }

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const base64Data = base64Audio.split(',')[1];

        // Create conversation record
        const { data: conversation, error: convError } = await supabase
          .from('conversations')
          .insert({
            user_id: user.id,
            title: title.trim(),
            type: 'discussion',
            duration_seconds: recordingTime,
            status: 'completed',
          })
          .select()
          .single();

        if (convError) throw convError;

        toast({
          title: "Recording saved!",
          description: "Your conversation has been saved to your vault",
        });

        // Reset and close
        resetModal();
        onOpenChange(false);
      };

    } catch (error) {
      console.error('Error saving recording:', error);
      toast({
        title: "Error saving recording",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetModal = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setTitle("");
    setAudioBlob(null);
    chunksRef.current = [];
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetModal();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            {audioBlob ? "Save Recording" : "New Recording"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!audioBlob ? (
            <>
              {/* Recording Controls */}
              <div className="flex flex-col items-center gap-6 py-8">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity ${
                    isRecording ? 'bg-primary/50 animate-pulse' : 'bg-primary/20'
                  }`} />
                  <Button
                    size="lg"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative w-24 h-24 rounded-full ${
                      isRecording 
                        ? 'bg-destructive hover:bg-destructive/90' 
                        : 'bg-gradient-to-br from-primary to-secondary hover:opacity-90'
                    }`}
                  >
                    {isRecording ? (
                      <Square className="w-10 h-10" />
                    ) : (
                      <Mic className="w-10 h-10" />
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold font-mono text-gradient mb-2">
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-sm text-foreground/60">
                    {isRecording ? "Recording in progress..." : "Click to start recording"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Save Form */}
              <div className="space-y-4">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold font-mono text-gradient mb-1">
                    {formatTime(recordingTime)}
                  </div>
                  <p className="text-sm text-foreground/60">Recording duration</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Recording Title</label>
                  <Input
                    placeholder="e.g., Team Meeting, Lecture Notes..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSaving}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAudioBlob(null);
                      setRecordingTime(0);
                    }}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    Record Again
                  </Button>
                  <Button
                    onClick={saveRecording}
                    disabled={isSaving || !title.trim()}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Recording
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordingModal;