import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState, forwardRef } from 'react';

// Types for Quill (since we're using it via CDN)
declare global {
  interface Window {
    Quill: any;
  }
}

interface MWTextEditorProps {
  placeholder?: string;
  initialContent: string;
  onChange?: (content: string) => void;
  height?: string;
}

export interface MWTextEditorRef {
  getContent: () => string;
  setContent: (content: string) => void;
  clearContent: () => void;
}

const MWTextEditor = forwardRef<MWTextEditorRef, MWTextEditorProps>(
  function MWTextEditor(
    {
      placeholder = "Start writing...",
      initialContent = "",
      onChange
    }: MWTextEditorProps,
    ref
  ) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    let toolbarRef = useRef<any>(null);
    const [isQuillLoaded, setIsQuillLoaded] = useState(false);

    // Load Quill.js dynamically
    useEffect(() => {
      const loadQuill = async () => {
        if (window.Quill) {
          setIsQuillLoaded(true);
          return;
        }

        // Load Quill CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
        document.head.appendChild(link);

        // Load Quill JS
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
        script.onload = () => setIsQuillLoaded(true);
        document.body.appendChild(script);
      };

      loadQuill();
    }, []);

    // Initialize Quill editor
    useEffect(() => {
      if (!isQuillLoaded || !editorRef.current || quillRef.current) return;

      // Limited toolbar configuration - no font family/size options
      const toolbarOptions = [
        ['bold', 'italic', 'underline'],        // Basic formatting
        ['blockquote', 'code-block'],
        ['link', 'formula'],
        ['clean']                              // Remove formatting
      ];

      // Initialize Quill with limited options
      const quill = new window.Quill(editorRef.current, {
        theme: 'snow',
        placeholder: placeholder,
        modules: {
          toolbar: toolbarOptions,
          // Disable keyboard shortcuts that might allow font changes
          keyboard: {
            bindings: {
              // Disable Ctrl+Shift+F (font family shortcut in some editors)
              'font-family': {
                key: 'F',
                ctrlKey: true,
                shiftKey: true,
                handler: () => false
              }
            }
          }
        },
        formats: [
          'bold', 'italic', 'underline',
          'list', 'bullet',
          'link'
        ]
      });

      // Set initial content
      if (initialContent) {
        quill.clipboard.dangerouslyPasteHTML(initialContent);
      }

      // Handle content changes
      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onChange?.(content);
      });

      quillRef.current = quill;
      if(quillRef.current.getModule("toolbar"))
        toolbarRef.current = quillRef.current.getModule("toolbar");

      // Cleanup function
      return () => {
        if (quillRef.current) {
          quillRef.current = null;
        }
        
        if(editorRef.current) {
          let editor = editorRef.current;
          editor.innerHTML = "";
        }
      };
    }, [isQuillLoaded, placeholder, initialContent, onChange]);

    // Expose methods via ref
    React.useImperativeHandle(ref, () => ({
      getContent: (): string => {
        return quillRef.current ? quillRef.current.root.innerHTML : '';
      },
      setContent: (content: string): void => {
        if (quillRef.current) {
          quillRef.current.clipboard.dangerouslyPasteHTML(content);
        }
      },
      clearContent: (): void => {
        if (quillRef.current) {
          quillRef.current.setText('');
        }
      },
      destroyTextEditor: () => {
        
        if(editorRef.current) {
          let editor = editorRef.current;
          editor.innerHTML = "";
        }

        quillRef.current = null;
        Array.from(document.getElementsByClassName(toolbarRef.current.container.className)).forEach(itm => itm.remove());
        console.log('toolbarRef', toolbarRef.current)
      }
    }));

    if (!isQuillLoaded) {
      return (
        <div className="flex items-center justify-center p-8 border border-gray-300 rounded-lg bg-gray-50">
          <div className="text-gray-600">Loading editor...</div>
        </div>
      );
    }

    return (
      <Box
        mt={0}
        maxWidth="80vw"
        id="editor"
        ref={editorRef} 
        minHeight="60vh" 
        bg='white'
      />
    );
  }
);

export default MWTextEditor;