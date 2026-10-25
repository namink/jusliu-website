import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import pymupdf
import os
import threading
import subprocess
import time

class Pdf2ImgApp:
    def __init__(self, root):
        self.root = root
        root.title("PDF 转图片工具")
        root.geometry("460x410")
        root.resizable(False, False)
        root.configure(bg="#1e1e2e")

        self.pdf_path = tk.StringVar()
        self.dpi = tk.IntVar(value=150)
        self.progress_var = tk.DoubleVar(value=0)
        default_out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
        self.out_dir = tk.StringVar(value=default_out)

        self._build_ui()

    def _build_ui(self):
        bg = "#1e1e2e"
        fg = "#cdd6f4"
        accent = "#89b4fa"
        card = "#313244"

        tk.Label(self.root, text="PDF 转图片工具", font=("Segoe UI", 18, "bold"),
                 bg=bg, fg=fg).pack(pady=(20, 4))
        tk.Label(self.root, text="提取 PDF 每一页为 PNG 图片", font=("Segoe UI", 10),
                 bg=bg, fg="#6c7086").pack(pady=(0, 16))

        frame = tk.Frame(self.root, bg=card, padx=20, pady=16)
        frame.pack(fill="x", padx=24)

        self.select_btn = tk.Button(
            frame, text="选择 PDF 文件...", command=self._choose_pdf,
            bg=accent, fg="#11111b", font=("Segoe UI", 11, "bold"),
            activebackground="#74c7ec", relief="flat", cursor="hand2", pady=6)
        self.select_btn.pack(fill="x")

        self.file_label = tk.Label(frame, text="未选择文件", bg=card, fg="#6c7086",
                                   font=("Segoe UI", 10), anchor="w", wraplength=380)
        self.file_label.pack(fill="x", pady=(8, 4))

        dpi_frame = tk.Frame(frame, bg=card)
        dpi_frame.pack(fill="x", pady=(8, 4))
        tk.Label(dpi_frame, text="分辨率:", bg=card, fg=fg,
                 font=("Segoe UI", 10)).pack(side="left")
        for value, label in ((150, "150 DPI (网页)"), (300, "300 DPI (高清)")):
            tk.Radiobutton(dpi_frame, text=label, variable=self.dpi, value=value,
                           bg=card, fg=fg, selectcolor=card, activebackground=card,
                           activeforeground=fg, font=("Segoe UI", 10)).pack(side="left", padx=(8, 0))

        self.out_btn = tk.Button(
            frame, text="选择输出文件夹...", command=self._choose_output,
            bg="#45475a", fg=fg, font=("Segoe UI", 10),
            activebackground="#585b70", relief="flat", cursor="hand2", pady=4)
        self.out_btn.pack(fill="x", pady=(8, 0))

        self.out_label = tk.Label(frame, text=self.out_dir.get(), bg=card, fg="#6c7086",
                                  font=("Segoe UI", 9), anchor="w", wraplength=380)
        self.out_label.pack(fill="x", pady=(4, 0))

        self.start_btn = tk.Button(
            frame, text="开始转换", command=self._start_convert,
            bg="#a6e3a1", fg="#11111b", font=("Segoe UI", 12, "bold"),
            activebackground="#94e2d5", relief="flat", cursor="hand2", pady=6,
            state="disabled")
        self.start_btn.pack(fill="x", pady=(12, 4))

        self.progress = ttk.Progressbar(frame, variable=self.progress_var, maximum=100)
        self.progress.pack(fill="x", pady=(4, 0))

        self.status_label = tk.Label(frame, text="", bg=card, fg="#a6e3a1",
                                     font=("Segoe UI", 10), anchor="w")
        self.status_label.pack(fill="x", pady=(8, 0))

        self.open_btn = tk.Button(
            root, text="打开输出文件夹", command=self._open_output,
            bg=card, fg=fg, font=("Segoe UI", 10),
            activebackground="#45475a", relief="flat", cursor="hand2", pady=4)
        self.open_btn.pack(pady=(12, 16))

    def _choose_pdf(self):
        path = filedialog.askopenfilename(
            title="选择 PDF 文件",
            filetypes=[("PDF 文件", "*.pdf"), ("所有文件", "*.*")])
        if path:
            self.pdf_path.set(path)
            self.file_label.config(text=os.path.basename(path), fg="#cdd6f4")
            self.start_btn.config(state="normal")

    def _choose_output(self):
        path = filedialog.askdirectory(title="选择输出文件夹")
        if path:
            self.out_dir.set(path)
            self.out_label.config(text=path, fg="#cdd6f4")

    def _start_convert(self):
        path = self.pdf_path.get()
        if not path:
            messagebox.showwarning("提示", "请先选择 PDF 文件")
            return
        self.start_btn.config(state="disabled")
        self.select_btn.config(state="disabled")
        self.out_btn.config(state="disabled")
        self.progress_var.set(0)
        threading.Thread(target=self._convert, args=(path,), daemon=True).start()

    def _convert(self, path):
        dpi = self.dpi.get()
        out_dir = self.out_dir.get()
        os.makedirs(out_dir, exist_ok=True)

        try:
            doc = pymupdf.open(path)
            total = len(doc)
            start = time.time()

            for i, page in enumerate(doc):
                pix = page.get_pixmap(dpi=dpi)
                filename = f"page-{i+1:03d}.png"
                pix.save(os.path.join(out_dir, filename))
                self.progress_var.set((i + 1) / total * 100)
                self.status_label.config(text=f"[{i+1}/{total}] {filename}  {pix.width}x{pix.height}")

            elapsed = time.time() - start
            self.status_label.config(text=f"完成: {total} 页，耗时 {elapsed:.1f}s")
            self.open_btn.config(state="normal")
            messagebox.showinfo("完成", f"转换完成!\n{total} 页已保存到:\n{out_dir}")
        except Exception as e:
            self.status_label.config(text=f"错误: {e}", fg="#f38ba8")
            messagebox.showerror("错误", str(e))
        finally:
            self.start_btn.config(state="normal")
            self.select_btn.config(state="normal")
            self.out_btn.config(state="normal")

    def _open_output(self):
        out_dir = self.out_dir.get()
        if os.path.isdir(out_dir):
            os.startfile(out_dir)

if __name__ == "__main__":
    root = tk.Tk()
    Pdf2ImgApp(root)
    root.mainloop()
