/*

Visible in localState:

  - visible: original visible of child
  - maskVisible: invisible by parent mask, see MaskChildren.js
      - undefined (not in masking) : Equal to mask visible
      - true (mask visible) : Inside, or across parent's visible area
      - false (maske invisible) : Out of parent's visible area

Visible result of child = (parent visible) && (child visible) && (mask visible)
*/

export default {
    updateChildVisible(child) {
        var localState = this.getLocalState(child);
        var maskVisible = (localState.hasOwnProperty('maskVisible')) ? localState.maskVisible : true;
        child.visible = this.visible && localState.visible && maskVisible;
        return this;
    },

    syncVisible() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildVisible, this);
        }
        return this;
    },

    resetChildVisibleState(child) {
        var localState = this.getLocalState(child);
        // Delete maskVisible property
        if (localState.hasOwnProperty('maskVisible')) {
            delete localState.maskVisible;
        }
        localState.visible = child.visible;
        return this;
    },

    setChildVisible(child, visible) {
        // Visible of child will be affect by parent's visible, and mask visible
        this.setChildLocalVisible(child, visible);
        return this;
    },

    // Internal method
    setChildLocalVisible(child, visible) {
        if (visible === undefined) {
            visible = true;
        }
        this.getLocalState(child).visible = visible;
        this.updateChildVisible(child);
        return this;
    },

    // Internal method
    setChildMaskVisible(child, visible) {
        if (visible === undefined) {
            visible = true;
        }
        this.getLocalState(child).maskVisible = visible;
        this.updateChildVisible(child);
        return this;
    }
};